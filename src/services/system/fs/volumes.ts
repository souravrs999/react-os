export enum MimeTypes {
    APPLICATON_FOLDER = 'application/vnd.folder',
}

export interface ISystemVolumes {
    id: string;
    mountPoint: string;
    mimeType: MimeTypes;
}

export const SYSTEM_VOLUMES = [
    {
        id: 'home',
        name: 'Home',
        mountPoint: '/home',
        mimeType: 'application/vnd.folder'
    },
    {
        id: 'desktop',
        name: 'Desktop',
        mountPoint: '/desktop',
        mimeType: 'application/vnd.folder'
    },
    {
        id: 'downloads',
        name: 'Downloads',
        mountPoint: '/downloads',
        mimeType: 'application/vnd.folder'
    },
    {
        id: 'videos',
        name: 'Videos',
        mountPoint: '/videos',
        mimeType: 'application/vnd.folder'
    },
    {
        id: 'images',
        name: 'Images',
        mountPoint: '/images',
        mimeType: 'application/vnd.folder'
    },
    {
        id: 'trash',
        name: 'Trash',
        mountPoint: '/trash',
        mimeType: 'application/vnd.folder'
    },
]