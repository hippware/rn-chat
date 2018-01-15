declare var global: any
import {DOMParser} from 'xmldom'

global.DOMParser = DOMParser

global.document = new DOMParser().parseFromString('<html><head></head><body></body></html>', 'html')
global.document.documentElement = {}
global.document.documentElement.style = []

global.window = global

import 'strophejs'
