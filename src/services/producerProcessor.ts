interface Producer {
    name: string;
    year: number;
    winner: boolean;
  }
  
  const mapAndFormatProducers = (result: any[]): Producer[] => {
    return result.flatMap(item => {
      if (!item.producers || !item.year || !item.winner) return [];
  
      const producers = item.producers.split(',').map((p: string) => p.trim()).filter(Boolean);
      return producers.map((producer: any) => ({
        name: producer,
        year: item.year,
        winner: item.winner
      }));
    });
  };
  
  const calculateProducerIntervals = (items: Producer[]): any[] => {
    const directorMap = new Map<string, number[]>();
  
    for (const producer of items) {
      if (producer.winner) {
        if (!directorMap.has(producer.name)) {
          directorMap.set(producer.name, []);
        }
        directorMap.get(producer.name)!.push(producer.year);
      }
    }
  
    const producersFormat: any[] = [];
  
    for (const [name, years] of directorMap) {
      years.sort((a, b) => a - b);
  
      const intervals = years.map((year, index) => {
        if (index === 0) return null;
        return year - years[index - 1];
      }).filter(interval => interval !== null) as number[];
  
      for (let i = 0; i < intervals.length; i++) {
        producersFormat.push({
          name,
          previousWin: years[i],
          followingWin: years[i + 1],
          interval: intervals[i]
        });
      }
    }
  
    return producersFormat;
  };
  
  export { mapAndFormatProducers, calculateProducerIntervals };