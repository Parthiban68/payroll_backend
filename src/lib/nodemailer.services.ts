import nodemailer, { Transporter } from "nodemailer";
import { envConfig } from "@/config/env.config";

type MailOptions = {
  to: string;
  subject: string;
  html?: string;
};

class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: envConfig.mail_details.email_id,
        pass: envConfig.mail_details.password,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 10_000,
      greetingTimeout: 5_000,
      socketTimeout: 10_000,
    });
  }

  async sendMail(options: MailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: "no-reply <no-reply@gmail.com>",
      ...options,
    });
  }
}

export const mailServiceInstance = new MailService();

// function generateICS() {
//   return `
// BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//YourApp//Ticket Booking//EN
// CALSCALE:GREGORIAN
// METHOD:REQUEST
// BEGIN:VEVENT
// UID:123456789@yourapp.com
// DTSTAMP:20260216T120000Z
// DTSTART:20260220T130000Z
// DTEND:20260220T160000Z
// SUMMARY:Avengers Movie
// DESCRIPTION:Movie Ticket Confirmation
// LOCATION:PVR Cinemas, Chennai
// STATUS:CONFIRMED
// SEQUENCE:0
// ORGANIZER;CN=Ticket Booking:mailto:parthiban1268@gmail.com
// ATTENDEE;CN=Parthiban;RSVP=TRUE:mailto:parthibanm8612@gmail.com
// END:VEVENT
// END:VCALENDAR

// `;
// }

// function generateBusICS() {
//   return `
// BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//YourApp//Bus Booking//EN
// CALSCALE:GREGORIAN
// METHOD:REQUEST
// BEGIN:VEVENT
// UID:BUS12345@yourapp.com
// DTSTAMP:20260210T120000Z
// DTSTART;TZID=Asia/Kolkata:20260217T200000
// DTEND;TZID=Asia/Kolkata:20260217T203000
// SUMMARY:Bus Departure - Thiruchendur → Coimbatore
// DESCRIPTION:Bus departs at 8:00 PM\\nPNR: AY5821370649\\nPlease arrive 15 minutes early.
// LOCATION:Thiruchendur Bus Stand
// STATUS:CONFIRMED
// SEQUENCE:0
// ORGANIZER;CN=YourApp Booking:mailto:noreply@yourapp.com
// ATTENDEE;CN=Parthiban;RSVP=TRUE:mailto:parthibanm8612@gmail.com
// BEGIN:VALARM
// TRIGGER:-PT30M
// ACTION:DISPLAY
// DESCRIPTION:Reminder - Bus departs in 30 minutes
// END:VALARM
// END:VEVENT
// END:VCALENDAR
// `;
// }


// async function sendMail() {
//   // const icsContent = generateICS();
//   const icsContent = generateBusICS()

//   const transport = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//       user: envConfig.mail_details.email_id,
//       pass: envConfig.mail_details.password
//     }
//   })

//   await transport.sendMail({
//     from: '"Bus Ticket Booking" <noreply@gmail.com>',
//     to: "srihariprasanth123@gmail.com",
//     subject: "Your Ticket Confirmation",
//     html: `
//       <h2>Booking Confirmed</h2>
//       <p>Movie: Avengers</p>
//       <p>Date: 20 Feb 2026</p>
//       <script type="application/ld+json">
// {
//   "@context": "http://schema.org",
//   "@type": "BusReservation",
//   "reservationNumber": "AY5821370649",
//   "reservationStatus": "http://schema.org/ReservationConfirmed",
//   "underName": {
//     "@type": "Person",
//     "name": "Parthiban"
//   },
//   "reservationFor": {
//     "@type": "BusTrip",
//     "departureBusStop": {
//       "@type": "BusStation",
//       "name": "Thiruchendur"
//     },
//     "arrivalBusStop": {
//       "@type": "BusStation",
//       "name": "Coimbatore"
//     },
//     "departureTime": "2025-07-26T22:00:00+05:30",
//     "arrivalTime": "2025-07-27T06:00:00+05:30"
//   }
// }
// </script>

//     `,
//     alternatives: [
//       {
//         contentType: "text/calendar; method=REQUEST; name=invite.ics",
//         content: icsContent
//       }
//     ],
//     attachments: [
//       {
//         filename: "invite.ics",
//         content: icsContent,
//         contentType: "application/ics"
//       }
//     ]
//   });

//   console.log("Mail Sent");
// }

// sendMail();
