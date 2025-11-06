// Backend'deki User.java'nın frontend'deki karşılığı
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  userSkills: string[]; // En önemli alan! Backend'deki User.java ile aynı isimde.
}
