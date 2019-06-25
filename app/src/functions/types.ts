import Firestore, {
  DocumentReference as DR,
  DocumentSnapshot as DS,
  CollectionReference as CR,
  QuerySnapshot as QS,
  SnapshotError
} from "react-native-firebase/firestore";

export interface ImageData {
  base64: string;
  width: number;
  height: number;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  original?: string;
}

interface CObserver<T> {
  next: CObserverOnNext<T>;
  error?: CObserverOnError;
}
type CObserverOnNext<T> = (querySnapshot: QuerySnapshot<T>) => void;
type CObserverOnError = (err: SnapshotError) => void;

export interface CollectionReference<T extends {}> extends CR {
  onSnapshot(
    onNext: CObserverOnNext<T>,
    onError?: CObserverOnError
  ): () => void;

  onSnapshot(observer: CObserver<T>): () => void;

  onSnapshot(
    metadataChanges: MetadataChanges,
    onNext: CObserverOnNext<T>,
    onError?: CObserverOnError
  ): () => void;

  onSnapshot(
    metadataChanges: MetadataChanges,
    observer: CObserver<T>
  ): () => void;
}

interface QuerySnapshot<T extends {}> extends QS {
  readonly docs: Array<DocumentSnapshot<T>>;
}

interface GetOptions {
  source: "default" | "server" | "cache";
}
type ObserverOnNext<T> = (documentSnapshot: DocumentSnapshot<T>) => void;
type ObserverOnError = (err: Firestore.SnapshotError) => void;
interface Observer<T> {
  next: ObserverOnNext<T>;
  error?: ObserverOnError;
}
interface MetadataChanges {
  includeMetadataChanges: boolean;
}

export interface DocumentReference<T extends {}> extends DR {
  get(options?: GetOptions): Promise<DocumentSnapshot<T>>;
  update(obj: Partial<T>): Promise<void>;
  onSnapshot(
    onNext: (documentSnapshot: DocumentSnapshot<T>) => void,
    onError?: (err: Firestore.SnapshotError) => void
  ): () => void;

  onSnapshot(observer: Observer<T>): () => void;

  onSnapshot(
    metadataChanges: MetadataChanges,
    onNext: ObserverOnNext<T>,
    onError?: ObserverOnError
  ): () => void;

  onSnapshot(
    metadataChanges: MetadataChanges,
    observer: Observer<T>
  ): () => void;
}

interface DocumentSnapshot<T extends {}> extends DS {
  readonly ref: DocumentReference<T>;
  data(): T | void;
}
