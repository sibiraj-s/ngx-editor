import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxToolbarComponent } from './ngx-toolbar.component';
import { ngxEditorConfig } from '../ngx-editor.defaults';

describe('NgxToolbarComponent', () => {
    let component: NgxToolbarComponent;
    let fixture: ComponentFixture<NgxToolbarComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxToolbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxToolbarComponent);
        component = fixture.componentInstance;
        component.config = ngxEditorConfig;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
