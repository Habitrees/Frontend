import type { AxiosInstance } from 'axios';
import type { Habit, RecordHabitInput, UpdateHabitInput } from '../types';
import type { HabitsRepository } from './habitsRepository';

/** Proposed integration interface; agree final routes/DTO with backend first. */
export interface HabitsEndpoints {
  list: string;
  record: (habitId: string) => string;
  remove: (habitId: string) => string;
  /** Provided by backend contract later; never hardcode a guessed route. */
  update: (habitId: string) => string;
}

export class HttpHabitsRepository implements HabitsRepository {
  private readonly client: AxiosInstance;
  private readonly endpoints: HabitsEndpoints;

  constructor(client: AxiosInstance, endpoints: HabitsEndpoints) {
    this.client = client;
    this.endpoints = endpoints;
  }

  async getHabits(signal?: AbortSignal): Promise<Habit[]> {
    const response = await this.client.get<Habit[]>(this.endpoints.list, { signal });
    return response.data;
  }

  async recordHabit(habitId: string, input: RecordHabitInput): Promise<Habit> {
    const response = await this.client.post<Habit>(this.endpoints.record(habitId), input);
    return response.data;
  }

  async updateHabit(habitId: string, input: UpdateHabitInput): Promise<Habit> {
    const response = await this.client.patch<Habit>(this.endpoints.update(habitId), input);
    return response.data;
  }

  async deleteHabit(habitId: string): Promise<void> {
    await this.client.delete(this.endpoints.remove(habitId));
  }
}
