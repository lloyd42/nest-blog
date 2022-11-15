import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string;

  @IsNotEmpty({ message: '作者不能为空' })
  readonly author: string;

  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string;

  @IsNotEmpty({ message: '激活状态不能为空' })
  readonly isActive: boolean;
}
