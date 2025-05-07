import { db } from './config';
import { collection, addDoc, getDocs, getDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';

export interface Project {
  id?: string;
  name: string;
  projectNumber: string;
  client: string;
  projectManager: string;
  projectEngineer: string;
  siteEngineer: string;
  startDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const projectsRef = collection(db, 'projects');
    const now = Timestamp.now();
    
    const docRef = await addDoc(projectsRef, {
      ...projectData,
      startDate: Timestamp.fromDate(projectData.startDate),
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      ...projectData,
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Project[];
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

export const getProject = async (id: string): Promise<Project | null> => {
  try {
    const projectRef = doc(db, 'projects', id);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists()) {
      return null;
    }

    const data = projectDoc.data();
    return {
      id: projectDoc.id,
      ...data,
      startDate: data.startDate.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Project;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
}; 