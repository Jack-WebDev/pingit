import { Context } from '~/context';
import { TypeIdentifier } from '~/type';

import { BaseModel } from '@pingit/datakit';
import Objection from 'objection';

export enum NotificationCategory {
    General = 'General',
    UserAccount = 'UserAccount',
}

export enum NotificationMessage {
    AccountActivation = 'Your account has been activated',
    AccountDetailUpdate = 'Your account details have been updated',
}

export enum NotificationTitle {
    AccountActivation = 'Account Activated',
    AccountDetailUpdate = 'Account Detail Updated',
}

export enum NotificationStatus {
    New = 'New',
    Seen = 'Seen',
}

export class Notification extends BaseModel {
    static tableName = 'notification';
    static typeIdentifier = TypeIdentifier.Notification;

    id: string = '';
    userId: string = '';
    refId: string = '';
    category: NotificationCategory | null = null;
    title: string = '';
    message: string = '';
    status: NotificationStatus | null = null;
    createdAt: Date = new Date();

    static applySearch(
        query: Objection.QueryBuilder<Notification, Notification[]>,
        db: Context['db'],
        text?: string | null
    ) {
        if (text) {
            const rank = `ts_rank(search, websearch_to_tsquery('simple', ?))`;
            query
                .select(db.raw(`*, ${rank} as rank`, text))
                .whereRaw(`search @@ websearch_to_tsquery('simple', ?)`, text)
                .andWhereRaw(`${rank} > 0`, text)
                .orderBy('rank', 'desc');
        } else {
            query.select('*');
        }
    }
}
