import {types, isAlive} from 'mobx-state-tree'
import {FileAspectImage} from './FileAspectImage'
import {FileSquareImage} from './FileSquareImage'

export const FileEntity = types.union(FileAspectImage, FileSquareImage)
export type IFileEntity = typeof FileEntity.Type

export const FileRef = types.maybeNull(
  types.reference(FileEntity, {
    get(id: string, parent: any) {
      return (
        parent.service &&
        parent.service.files &&
        isAlive(parent.service.files.get(id)) &&
        parent.service.files.get(id)
      )
    },
    set(value: IFileEntity) {
      return value.id
    },
  })
)
