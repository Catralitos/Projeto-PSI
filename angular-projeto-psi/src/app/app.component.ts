import { Component, OnInit } from '@angular/core';
import { Hotel } from './interfaces/Hotel';
import { HotelService } from './hotel.service';
import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-projeto-psi';
  hotelList: Hotel[];
  message: string;

  constructor(private hotelService: HotelService,
              private data: DataService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    this.hotelService.getHotels().subscribe(response => this.hotelList = response.hotel_list);
  }
}
