type Arena = {
  required_point_level_up: number;
  level_up_to?: number;
  value_level: number;
}

export function getArena(level: number) {
  switch (level) {
    case 1: {
      return {
        required_point_level_up: 1000,
        level_up_to: 2,
        value_level: 10,
      } as Arena;
    } 
    case 2: {
      return {
        required_point_level_up: 2000,
        level_up_to: 3,
        value_level: 20,
      } as Arena
    }
    case 3: {
      return {
        required_point_level_up: 3000,
        level_up_to: 4,
        value_level: 30,
      } as Arena
    }
    case 4: {
      return {
        required_point_level_up: 4000,
        level_up_to: 5,
        value_level: 40,
      } as Arena
    }
    case 5: {
      return {
        required_point_level_up: 5000,
        value_level: 50,
      } as Arena
    }
  } 
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}