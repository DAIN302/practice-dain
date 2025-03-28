import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    genres: async () => prisma.genre.findMany(),
    artists: async () =>
      prisma.artist.findMany({
        include: { albums: true },
      }),
    artist: async (_: any, { id }: { id: string }) => {
      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(id) },
        include: { albums: true },
      });
      return artist;
    },
    songs: async () =>
      prisma.song.findMany({
        include: {
          genres: true,
          album: {
            include: { artist: true },
          },
          
        },
      }),
    albums: async () =>
      prisma.album.findMany({
        include: { artist: true, songs: true },
      }),
  },
  Mutations: {
    addGenre: async (_: any, { name }: { name: string }) => {
      const genre = await prisma.genre.create({
        data: { name },
      });
      return genre;
    },
    addArtist: async (_: any, { name }: { name: string }) => {
      const artist = await prisma.artist.create({
        data: { name },
      });
      return artist;
    },
    addSong: async (
      _: any,
      {
        title,
        albumId,
        genreIds,
        path,
      }: { title: string; albumId: string; genreIds: string[]; path: string }
    ) => {
      const song = await prisma.song.create({
        data: {
          title,
          album: { connect: { id: parseInt(albumId) } },
          genres: { connect: genreIds.map((id) => ({ id: parseInt(id) })) },
          
        },
        include: { genres: true, album: true },
      });
      return song;
    },
    addAlbum: async (
      _: any,
      {
        title,
        artistId,
        thumbnail,
        releaseDate,
      }: {
        title: string;
        artistId: string;
        thumbnail: string;
        releaseDate: string;
      }
    ) => {
      const artist = await prisma.artist.findUnique({
        where: { id: parseInt(artistId) },
      });

      if (!artist) {
        throw new Error(`Artist with ID ${artistId} not found`);
      }

      const album = await prisma.album.create({
        data: {
          title,
          artist: { connect: { id: parseInt(artistId) } },
          releaseDate: new Date(releaseDate),
        },
        include: { artist: true },
      });
      return album;
    },
  },
};

//findMany : 리스트를 여러개 가져오는 옵션
