import { colors } from "../../../_common/constants/colorList"

type Props = {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  index: number
  payload: { value: number }
}

/**
 * 円グラフのラベル
 * @param cx //中心のx座標
 * @param cy //中心のy座標
 * @param midAngle //中心角
 * @param innerRadius //内径
 * @param outerRadius //外径
 * @param index //インデックス
 * @param payload //ペイロード
 */
export const TotalPieChartLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
  payload,
}: Props) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + outerRadius * 0.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  const formattedValue = `${payload.value.toLocaleString()}円`

  return (
    <text
      x={x}
      y={y}
      fill={colors[index % colors.length]}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {formattedValue}
    </text>
  )
}
