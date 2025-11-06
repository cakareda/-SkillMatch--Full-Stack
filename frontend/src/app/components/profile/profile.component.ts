import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSkillService } from '../../services/user-skill.service';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model'; // 🔥 Hata 4 için import
import { HttpErrorResponse } from '@angular/common/http'; // 🔥 Hata 5 için import

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userSkills$: Observable<string[]>;
  skillInput: string = '';
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(private userSkillService: UserSkillService) {
    this.userSkills$ = this.userSkillService.userSkills$;
  }

  ngOnInit(): void {
    // Servis zaten constructor'da skilleri yüklüyor
  }

  addSkill(): void {
    if (this.skillInput.trim() === '') {
      return; 
    }
    
    const currentSkills = this.userSkillService.getCurrentSkills();
    const newSkill = this.skillInput.trim();

    if (!currentSkills.includes(newSkill)) {
      this.saveSkills([...currentSkills, newSkill]);
    }
    this.skillInput = '';
  }

  removeSkill(skillToRemove: string): void {
    const currentSkills = this.userSkillService.getCurrentSkills();
    const updatedSkills = currentSkills.filter(skill => skill !== skillToRemove);
    this.saveSkills(updatedSkills);
  }

  saveSkills(skills: string[]): void {
    this.isLoading = true;
    this.successMessage = '';

    // Hata 3'ün kaynağı burası
    this.userSkillService.updateUserSkills(skills).subscribe({
      complete: () => {
        this.isLoading = false;
        this.successMessage = 'Skiller başarıyla güncellendi!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Skill kaydetme hatası:', err);
      }
    });
  }
}

