package booksForAll.model;

import java.util.List;

public class Book {
	private String Name;
	private String Author;
	private String URL;
	private String Photo;
	private double Price;
	private String Description;
	private int LikesNum;
	private List<Like> Likes;
	private List<Comment> Comments;
	
	public Book(String name, String author, String url, String photo, double price, String description, 
			int LikesNum, List<Like> likes, List<Comment> comments) {
		this.Name = name;
		this.Author = author;
		this.URL = url;
		this.Photo = photo;
		this.Description = description;
		this.Price = price;
		this.LikesNum = LikesNum;
		this.Likes = likes;
		this.Comments = comments;
	}
	
	public String getName() {
		return Name;
	}

	public void setName(String name) {
		this.Name = name;
	}

	public List<Comment> getComments() {
		return Comments;
	}

	public void setComments(List<Comment> comments) {
		this.Comments = comments;
	}

	public String getUrl() {
		return URL;
	}

	public void setUrl(String url) {
		this.URL = url;
	}

	public double getPrice() {
		return Price;
	}

	public void setPrice(double price) {
		this.Price = price;
	}

	public String getPhoto() {
		return Photo;
	}

	public void setPhoto(String photo) {
		this.Photo = photo;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		this.Description = description;
	}

	public List<Like> getLikes() {
		return Likes;
	}

	public void setLikes(List<Like> likeUsernames) {
		this.Likes = likeUsernames;
	}

	public String getAuthor() {
		return Author;
	}

	public void setAuthor(String author) {
		this.Author = author;
	}

	public int getLikesNum() {
		return LikesNum;
	}

	public void setLikesNum(int likesNum) {
		LikesNum = likesNum;
	}

}
