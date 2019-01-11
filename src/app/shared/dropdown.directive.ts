import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appDropDown]'
})

export class DropDownDirective {
	@HostBinding('class.open') isOpen: boolean = false;

	@HostListener('click') onClick() {
		this.isOpen = !this.isOpen;
	}

	constructor() {}
}