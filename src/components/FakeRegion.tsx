/** @jsxImportSource theme-ui */

interface IFakeRegion {
  id: string
}

const FakeRegion = ({ id }: IFakeRegion) => {
  return (
    <span
      sx={{
        position: "relative"
      }}
    >
      <span
        id={id}
        sx={{
          position: "absolute",
          top: -5,
          left: 0
        }}
      />
    </span>
  )
}

export default FakeRegion
