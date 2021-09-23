export type Chess = '' | 'O' | 'X'
export type Btn = [Chess, Chess, Chess, Chess, Chess, Chess, Chess, Chess, Chess,]

export enum Status {
    WAITING_FOR_OTHER_PLAYER_TO_JOIN,
    O_next,
    X_next,
    O_won,
    X_won,
    Draw,
}

interface Room {
    roomID: string;
    passcode: string;
    headcount: 0 | 1 | 2;
    btn: Btn;
    status: Status;
}

type Rooms = Room[]

export default Rooms
