import {
  listVideoCategories,
  mapCategoriesToRecord,
} from '../../api/youtube/videoCategories'

class VideoCategoryCache {
  private categories: Record<string, string> | null = null
  private loading: Promise<Record<string, string>> | null = null

  async load(): Promise<Record<string, string>> {
    if (this.categories) {
      return this.categories
    }

    if (this.loading) {
      return this.loading
    }

    this.loading = listVideoCategories()
      .then((response) => {
        this.categories = mapCategoriesToRecord(response)
        return this.categories
      })
      .finally(() => {
        this.loading = null
      })

    return this.loading
  }

  getName(categoryId: string): string | undefined {
    return this.categories?.[categoryId]
  }

  getAll(): Record<string, string> | null {
    return this.categories
  }

  clear(): void {
    this.categories = null
    this.loading = null
  }
}

export const videoCategoryCache = new VideoCategoryCache()
