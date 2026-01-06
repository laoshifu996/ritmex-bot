export interface MakerPointsBandConfig {
  band0To10: boolean;
  band10To30: boolean;
  band30To100: boolean;
}

export function buildBpsTargets(config: MakerPointsBandConfig): number[] {
  const targets: number[] = [];
  if (config.band0To10) targets.push(9);
  if (config.band10To30) targets.push(29);
  if (config.band30To100) targets.push(99);
  return targets.sort((a, b) => a - b);
}

export function computeDislocationBps(
  markPrice: number | null | undefined,
  bestBid: number | null | undefined,
  bestAsk: number | null | undefined
): number | null {
  const mark = Number(markPrice);
  if (!Number.isFinite(mark) || mark <= 0) return null;
  const distances: number[] = [];
  const bid = Number(bestBid);
  const ask = Number(bestAsk);
  if (Number.isFinite(bid)) {
    distances.push(Math.abs(mark - bid) / mark * 10000);
  }
  if (Number.isFinite(ask)) {
    distances.push(Math.abs(ask - mark) / mark * 10000);
  }
  if (!distances.length) return null;
  const max = Math.max(...distances);
  return Number.isFinite(max) ? max : null;
}
