import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal, TrackByFunction } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Data } from '@angular/router';
import { ScrollEndDirective } from '../scroll-end.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone : true,
  imports: [CommonModule, MatTableModule, ScrollEndDirective, MatButtonModule],
})
export class TableComponent {
  @Input({ required: true }) set TableData(data: Data[] | null) {
    this.dataSignal.set(data ?? []);
    this.limitSignal.set(this.defaultValue);
  }
  private defaultValue = 30;

  private dataSignal = signal<Data[]>([]);
  private limitSignal = signal<number>(this.defaultValue);

  dataSourceSignal = computed(() => {
    const data = this.dataSignal().slice(0, this.limitSignal());
    return new MatTableDataSource<Data>(data);
  });

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];

  identity: TrackByFunction<Data> = (_, item: Data) => item['id'];

  onReset() {
    this.limitSignal.set(this.defaultValue);
    window.scrollTo(0, 0);
  }

  onScrollEnd() {
    console.log('emit called');
    this.limitSignal.update((val) => val + this.defaultValue);
  }
}
