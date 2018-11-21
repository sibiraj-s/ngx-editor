import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SourceCodeData } from '../common/models/source-code-data';

@Component({
  selector: 'app-source-code-dialog',
  templateUrl: './source-code-dialog.component.html',
  styleUrls: ['./source-code-dialog.component.scss']
})
export class SourceCodeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SourceCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SourceCodeData
  ) {}

  ngOnInit() {}
}
