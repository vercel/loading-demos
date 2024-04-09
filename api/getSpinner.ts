import { Spinner } from '@/components/spinner';

export async function getSpinner() {
  // Simulate loading time for a complex component
  const latency = 2000;
  await new Promise(r => setTimeout(r, latency));

  return Spinner;
}
