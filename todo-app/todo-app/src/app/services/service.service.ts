import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth'; 
import { getApp } from 'firebase/app'; 
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private auth: Auth;
  private userId: string | null = null;

  constructor(private firestore: Firestore,private snackBar:MatSnackBar) {
    this.auth = getAuth(getApp());
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.subscribeToTasks();
      }
    });
  }
  private subscribeToTasks(): void {
    if (!this.userId) return;
    const taskCollection: CollectionReference = collection(this.firestore, `users/${this.userId}/tasks`);
    const taskQuery = query(taskCollection, orderBy('active', 'desc'), orderBy('date', 'desc'));
    onSnapshot(taskQuery, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      this.tasksSubject.next(tasks);
    });
  }

  async save(item: any): Promise<void> {
    if (!this.userId) return;
    const taskCollection = collection(this.firestore, `users/${this.userId}/tasks`);
    const taskData = { ...item, date: new Date(item.date).toISOString() };
    const taskQuery = query(taskCollection, where('title', '==', taskData.title), where('task', '==', taskData.task), where('date', '==', taskData.date));
    const snapshot = await getDocs(taskQuery);
    if (snapshot.empty) {
      try {
        await addDoc(taskCollection, taskData);
        console.log('Task saved:', taskData);
      } catch (error) {
        console.error('Error saving task:', error);
      }
    } else {
      alert("Task already exists!");
    }
  }

  async del(taskId: string): Promise<void> {
    if (!this.userId) return;
    const taskCollection: CollectionReference = collection(this.firestore, `users/${this.userId}/tasks`);
    const taskRef = doc(taskCollection, taskId);
    try {
      await deleteDoc(taskRef);
      console.log(`Task deleted: ${taskId}`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async markline(taskId: string): Promise<void> {
    if (!this.userId) return;
    const taskCollection: CollectionReference = collection(this.firestore, `users/${this.userId}/tasks`);
    const taskRef = doc(taskCollection, taskId);
    const taskDoc = await getDoc(taskRef);
    const taskData = taskDoc.data();
    if (taskData) {
      await updateDoc(taskRef, { active: !taskData['active'] });
      console.log(`Task updated: ${taskData['title']} - active: ${!taskData['active']}`);
    }
  }
}

