interface Props {
  params: { id: string }
}

export default async function ProductSlug({ params }: Props) {
  return <div>Producto: {params.id}</div>
}
