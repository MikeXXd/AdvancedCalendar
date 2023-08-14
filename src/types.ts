export interface Event {
    id: string;
    name: string;
    allDay: boolean;
    startTime: string | undefined;
    endTime: string | undefined;
    color: string;
  }