import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent {
	constructor(private dataStorageService: DataStorageService,
							private authService: AuthService) { }

	saveDate() {
		this.dataStorageService.storeRecipes().subscribe(
			(response) => {
			// (response: HttpEvent<Object>) => {
				console.log(response);
				// console.log(response.type === HttpEventType.Response);
			}
		);
	}

	isAuthenticated(): boolean {
		return this.authService.isAuthenticated()
	}

	getRecipes() {
		this.dataStorageService.fetchRecipes();
	}

	onLogout() {
		this.authService.logout();
	}
}
