import { geoConicEqualArea, geoPath } from 'd3-geo'
import type { GeoProjection, GeoPath } from 'd3-geo'
import { mapExtent } from '../data/map/features'

export interface ProjectionBundle {
  projection: GeoProjection
  path: GeoPath
  width: number
  height: number
}

export function createProjection(width: number, height: number): ProjectionBundle {
  const [west, south, east, north] = mapExtent
  const projection = geoConicEqualArea()
    .parallels([25, 47])
    .rotate([-105, 0])
    .fitExtent(
      [
        [38, 30],
        [width - 38, height - 30],
      ],
      {
        type: 'MultiPoint',
        coordinates: [
          [west, south],
          [east, south],
          [east, north],
          [west, north],
        ],
      },
    )

  return {
    projection,
    path: geoPath(projection),
    width,
    height,
  }
}

export function projectPlace(
  projection: GeoProjection,
  coord: [number, number],
): [number, number] {
  const point = projection(coord)
  return point ? [point[0], point[1]] : [0, 0]
}
