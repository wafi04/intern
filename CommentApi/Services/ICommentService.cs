using CommentApi.Data;
using CommentApi.Dtos;
using CommentApi.Models;
using Microsoft.EntityFrameworkCore;


namespace CommentApi.Services;
public interface ICommentService
{
    Task<ResGetCommentByIdDto?> GetCommentByIdAsync(int id);
    Task<List<ResGetCommentsByUserDto>> GetAllCommentByUserAsync(int userId);
    Task<List<ResGetCommentsByUserDto>> GetAllComment();
    Task<ResGetCommentByIdDto> CreateCommentAsync(ReqCreateCommentDto comment);

    Task<ResGetCommentByIdDto?> UpdateCommentAsync(int id, ReqUpdateCommentDto commentDto);
    Task<bool> DeleteCommentAsync(int id);
}

public class CommentService : ICommentService
{
    private readonly ApplicationDbContext _context;

    public CommentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ResGetCommentByIdDto?> GetCommentByIdAsync(int id)
    {
        var comment = await _context.Comments
            .Where(c => c.Id == id)
            .Select(c => new ResGetCommentByIdDto
            {
                Id = c.Id,
                Content = c.Content,
                UserId = c.UserId,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .FirstOrDefaultAsync();

        return comment;
    }

    public async Task<List<ResGetCommentsByUserDto>>  GetAllComment(){
        var comments = await _context.Comments
            .Include(c => c.User) 
            .Select(c => new ResGetCommentsByUserDto
            {
                Id = c.Id,
                Content = c.Content,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                 User = new UserResponseDto 
            {
                Id = c.UserId,
                Name = c.User.Name,
                Email = c.User.Email
            }
            })
            .ToListAsync();

        return comments;
    }   

    public async Task<List<ResGetCommentsByUserDto>> GetAllCommentByUserAsync(int userId)
    {
        var comments = await _context.Comments
            .Where(c => c.UserId == userId)
        .Include(c => c.User) 
            .Select(c => new ResGetCommentsByUserDto
            {
                Id = c.Id,
                Content = c.Content,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                 User = new UserResponseDto 
            {
                Id = c.UserId,
                Name = c.User.Name,
                Email = c.User.Email
            }
            })
            .ToListAsync();

        return comments;
    }

    public async Task<ResGetCommentByIdDto> CreateCommentAsync(ReqCreateCommentDto commentDto)
    {
        var comment = new Comment
        {
            UserId = commentDto.UserId,
            Content = commentDto.Content,
            CreatedAt = DateTime.UtcNow
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return new ResGetCommentByIdDto
        {
            Id = comment.Id,
            Content = comment.Content,
            UserId = comment.UserId,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt
        };
    }
    public async Task<ResGetCommentByIdDto?> UpdateCommentAsync(int id, ReqUpdateCommentDto commentDto)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return null;
        }

        comment.Content = commentDto.Content;
        comment.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return new ResGetCommentByIdDto
        {
            Id = comment.Id,
            Content = comment.Content,
            UserId = comment.UserId,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt
        };
    }

    public async Task<bool> DeleteCommentAsync(int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return false;
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return true;
    }
}