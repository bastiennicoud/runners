import {User} from "./user";

export class Comment {
  /**
   * Uniq identifier of the vehicle
   *
   * @type {string}
   * @memberOf Vehicle
   */
  public id: string

  /**
   * Content of the comment
   *
   * @type {string}
   * @memberOf Comment
   */
  public message: string;

  /**
   * User who posted the comment
   *
   * @type {User}
   * @memberOf Comment
   */
  public author:User

  /**
   * Date of creation of the comment
   *
   * @type {string}
   * @memberOf Comment
   */
  public createdAt: Date;

  public static build(data:any) : Comment{
    let c = new Comment;
    c.id = data.id || data._id
    c.author = User.build(data.user)
    c.message = data.content
    c.createdAt = new Date(data.created_at)

    return c
  }

}
