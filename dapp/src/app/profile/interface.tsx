export interface Details {
  business: string;
  location: string;
  description: string;
  tags: {
    one: string;
    two: string;
    three: string;
    four: string;
  };
  name: string;
  type: string;
}

export interface Cards {
  src?: string;
  icon?: string;
  name?: string;
  location?: string;
}
