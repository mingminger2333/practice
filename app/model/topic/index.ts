import { Application } from 'egg';
import { Model, Document, Types } from 'mongoose';
import { UserModel } from '@/model/user';
import { TopicTabModel } from './tab';

export interface TopicModel extends Document {
  title: string;
  content: string;
  author_id: UserModel['_id'];
  tab_id: TopicTabModel['_id'];
  status: 'normal' | 'delete';
  visit_count: number;
}

export default (app: Application): Model<TopicModel> => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TopicSchema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      author_id: { type: Types.ObjectId, required: true },
      tab_id: { type: Types.ObjectId, required: true },

      status: { type: String, default: 'normal' },

      visit_count: { type: Number, default: 0 },
      like_count: { type: Number, default: 0 },
      collect_count: { type: Number, default: 0 },
    },
    {
      usePushEach: true,
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
  );

  return mongoose.model('topic', TopicSchema, 'topic');
};
