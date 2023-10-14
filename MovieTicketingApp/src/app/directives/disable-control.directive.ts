import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[appDisableControl]'
})
export class DisableControlDirective implements OnInit {

	@Input() condition!: boolean;

	constructor(private elementRef: ElementRef) { }

	ngOnInit(): void {
		if (this.condition)
			this.elementRef.nativeElement.disabled = true
	}
}