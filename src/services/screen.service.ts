import { Output, Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();

  constructor() {
    
  }

  private isLargeScreen() {
    

    
  }

  
}
