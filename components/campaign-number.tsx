type CampaignNumberProps = {
  prefix?: string
}

export function CampaignNumber({ prefix = " · " }: CampaignNumberProps) {
  return <>{prefix}Nº 55011</>
}
