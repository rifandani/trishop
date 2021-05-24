import firebase from 'firebase';
import { Dispatch, SetStateAction } from 'react';

export interface IUserContextState {
  user: FireUser | null;
  setUser: firebase.User | Dispatch<SetStateAction<firebase.User>>;
}

export interface IPhotoURL {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  path: string;
  preview?: string; // hasil URL.createObjectURL(image)
  size: number;
  type: string;
  webkitRelativePath: string;
}

export type PhotoURLs = IPhotoURL[];

// firebase type
export type DocRef = firebase.firestore.DocumentReference;
export type DocDataRef =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type Timestamp = firebase.firestore.Timestamp;
export type FireUser = firebase.User;
export type UserCredential = firebase.UserInfo;
export type UserCredential2 = firebase.auth.UserCredential;
export type FireError = firebase.FirebaseError;
