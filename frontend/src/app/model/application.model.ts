// Backend'deki Application.java'nın frontend'deki karşılığı
export interface Application {
  id?: number;
  name: string;
  email: string;
  message: string;
  jobTitle: string; // Backend'e hangi iş olduğunu söylemek için
}