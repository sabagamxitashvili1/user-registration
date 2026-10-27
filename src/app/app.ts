import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface User {
  name: string;
  lastName: string;
  age: number | null;
  email: string;
  image: string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  user: User = {
    name: "",
    lastName: "",
    age: null,
    email: "",
    image: "",
  };

  registeredUser: User | null = null;
  imageError = "";
  imageLoading = false;

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.user.image = "";
    this.imageError = "";

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      this.imageError = "აირჩიე JPG, PNG ან WEBP ფოტო.";
      input.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.imageError = "ფოტოს ზომა მაქსიმუმ 5 MB უნდა იყოს.";
      input.value = "";
      return;
    }

    this.imageLoading = true;

    const reader = new FileReader();

    reader.onload = () => {
      this.user.image = reader.result as string;
      this.imageLoading = false;
    };

    reader.onerror = () => {
      this.imageError = "ფოტოს წაკითხვა ვერ მოხერხდა. სცადე ხელახლა.";
      this.imageLoading = false;
    };

    reader.readAsDataURL(file);
  }

  register(): void {
    if (
      !this.user.name.trim() ||
      !this.user.lastName.trim() ||
      this.user.age === null ||
      !this.user.image ||
      this.imageLoading
    ) {
      return;
    }

    this.registeredUser = {
      ...this.user,
      name: this.user.name.trim(),
      lastName: this.user.lastName.trim(),
    };
  }
}
