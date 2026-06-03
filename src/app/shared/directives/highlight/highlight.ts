import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseover)': 'onHover()',
    '(mouseleave)': 'onLeave()',
    '[style.backgroundColor]': 'isHovered ? "red" : "transparent"'
  }
})
export class Highlight {
  protected isHovered = false;

  onHover(): void {
    this.isHovered = true;
  }

  onLeave(): void {
    this.isHovered = false;
  }
}
