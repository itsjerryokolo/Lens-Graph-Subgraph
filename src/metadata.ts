import {
	json,
	log,
	Bytes,
	dataSource,
	JSONValueKind,
} from '@graphprotocol/graph-ts'
import { MetadataOutput } from '../generated/schema'

export function handleMetadata(content: Bytes): void {
	let metadata = new MetadataOutput(dataSource.stringParam())
	const value = json.try_fromBytes(content)

	if (!value.isError) {
		let v = value.value.toObject()
		log.warning('Postion A - found', [])
		const image = v.get('image')

		const name = v.get('name')
		const description = v.get('description')
		const content = v.get('content')
		if (name != null && !name.isNull()) {
			metadata.name = name.toString()
			log.warning('Postion B - name found: {}', [name.toString()])
		}
		if (image != null && !image.isNull()) {
			metadata.image = image.toString()
			log.warning('Postion C - image found: {}', [image.toString()])
		}
		if (description != null && !description.isNull()) {
			metadata.description = description.toString()
			log.warning('Postion D - description found: {}', [description.toString()])
		}
		if (content != null && !content.isNull()) {
			metadata.content = content.toString()
			log.warning('Postion E - content found: {}', [content.toString()])
		}
		metadata.save()
	}
}
