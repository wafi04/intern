namespace CommentApi.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    // Relasi One-to-Many: Satu User memiliki banyak Comment
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}