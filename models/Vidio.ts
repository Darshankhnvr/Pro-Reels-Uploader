import mongoose, { Schema, model, models } from "mongoose";

export const VIDIO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVidio {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  vidioUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const VidioSchema = new Schema<IVidio>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vidioUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDIO_DIMENSIONS.height,
      },
      width: {
        type: Number,
        default: VIDIO_DIMENSIONS.width,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
      default: undefined,
    },
  },
  { timestamps: true }
);

const Vidio = models?.Vidio || model<IVidio>("User", VidioSchema);

export default Vidio;
