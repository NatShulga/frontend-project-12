import ProfanityFilter from 'leo-profanity';
import { cleanText } from './MessageList';

test('фильтрация нецензурных слов', () => {

  expect(cleanText('Это тестовое сообщение')).toBe('Это тестовое сообщение');
  expect(cleanText('Это хреновое сообщение')).toBe('Это **** сообщение');
  
  expect(cleanText('fuck')).toBe('****');
  expect(cleanText('shit')).toBe('****');
});
