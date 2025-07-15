export type ModelCost = {
    model: string
    prompt_token_cost: number
    completion_token_cost: number
  }
  
  export type Project = {
    project_id: string
    project_name: string
    project_description?: string
    model: string
    status?: 'active' | 'archived' | 'draft' | 'disabled'
    created_dtm: string
    api_keys?: string[]
    model_costs?: ModelCost[]
  }
  
  