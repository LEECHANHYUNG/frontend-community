export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: any; // You can expand this type based on your needs
  components: Record<string, any>;
  schemaVersion: number;
  styles: Record<string, any>;
}
