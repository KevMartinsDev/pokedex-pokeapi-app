// jest.setup.js
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
import 'jest-styled-components';

// Polyfill para TextEncoder e TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;