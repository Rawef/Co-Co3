import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { AnnonceService } from '../../shared/services/annonces.service';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from '../../shared/services/reservation.service';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as jsPDF from 'jspdf';

@Component({
	selector: 'app-reservation',
	templateUrl: './reservation.component.html',
	styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
	id: number = 0;
	annonce: any;
	selectedDates: NgbDateStruct[] = [];
	calendar = inject(NgbCalendar);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = null;
	toDate: NgbDate | null = null;
	blockedDatesList: any[] = [];
	disabledDates: NgbDateStruct[] | null = null;


	markDisabled = (date: NgbDateStruct) => {
		if (this.disabledDates != null) {
			for (let i = 0; i < this.disabledDates!.length; i += 2) {
				const startDate = this.disabledDates[i];
				const endDate = this.disabledDates[i + 1];
				const selectedDate = new Date(date.year, date.month - 1, date.day);
				const rangeStartDate = new Date(startDate.year, startDate.month - 1, startDate.day);
				const rangeEndDate = new Date(endDate.year, endDate.month - 1, endDate.day);

				if (selectedDate >= rangeStartDate && selectedDate <= rangeEndDate) {
					return true;
				}
			}
		}
		return false;
	};


	constructor(private route: ActivatedRoute, private annonceService: AnnonceService, private snackBar: MatSnackBar,
		private reservationService: ReservationService, private router: Router) {
	}


	ngOnInit(): void {

		this.route.paramMap.subscribe(params => {
			this.id = +params.get('id')!;
		});
		this.getAnnonce(this.id);
		this.getBlockedDates();
		
		


	}

	formatStringToDateStruct(dateString: string): NgbDateStruct {
		const dateParts = dateString.split('-').map(Number);
		return { year: dateParts[0], month: dateParts[1], day: dateParts[2] };
	}

	getBlockedDates() {
		this.reservationService.getBlockedDates(this.id).subscribe(
			(response: any[]) => {
				if (this.disabledDates == null) {
					this.disabledDates = [];
					for (let date of response) {
						this.disabledDates.push(this.formatStringToDateStruct(date));
					}
				}

			},
			(error: any) => {
				console.error('An error occurred while creating the annonce:', error);
			}
		);
	}



	getAnnonce(id: number) {
		this.annonceService.getAnnouncementById(id).subscribe(
			(response: any) => {
				this.annonce = response;

			},
			(error: any) => {
				console.error('An error occurred while creating the annonce:', error);
			}
		);
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
	formatNgbDate(ngbDate: NgbDate): string {
		const jsDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
		return formatDate(jsDate, 'yyyy-MM-dd', 'en-US');
	}

	reserver() {
		const formData = {
			dateDebut: this.formatNgbDate(this.fromDate!), // Format the start date
			dateFin: this.formatNgbDate(this.toDate!), // Format the end date
			annonceAirbnb: this.annonce
		}
		this.reservationService.createReservation(formData).subscribe(
			(response: any) => {
				this.downloadPDF();
				const counterFn = () => {
					window.location.reload();
				}
				this.fromDate = null;
				this.toDate = null;
				this.snackBar.open('Reservation confirmed', 'Close', {
					duration: 3000,
				});
				setTimeout(counterFn, 3000)

			},
			(error: any) => {
				console.error('An error occurred while creating the annonce:', error);
			}
		);

	}

	downloadPDF(): void {
		const start = new Date(this.formatNgbDate(this.fromDate!));
		const end = new Date(this.formatNgbDate(this.toDate!));
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
	
		const pdf = new jsPDF.default();
		
		// Add Title
		pdf.setFontSize(20);
		pdf.setTextColor("#333333");
		pdf.text(`Title: ${this.annonce.titre}`, 20, 20);
	
		// Add Start Date
		pdf.setFontSize(14);
		pdf.setTextColor("#666666");
		pdf.text(`Start Date: ${this.formatNgbDate(this.fromDate!)}`, 20, 40);
	
		// Add End Date
		pdf.text(`End Date: ${this.formatNgbDate(this.toDate!)}`, 20, 55);
	
		// Add Price
		pdf.setFontSize(16);
		pdf.setTextColor("#FF5733"); // Change color as per your preference
		pdf.text(`Price: ${(diffDays * this.annonce.prix)}`, 20, 70);
	
		// Add a line separator
		pdf.setLineWidth(0.5);
		pdf.setDrawColor("#CCCCCC");
		pdf.line(20, 80, 190, 80);
	
		const filename = `${this.annonce.titre}_${this.formatNgbDate(this.fromDate!)}_${this.formatNgbDate(this.toDate!)}.pdf`;
	
		pdf.save(filename);
	}
	

}
