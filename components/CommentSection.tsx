"use client"
import * as React from "react"
import { Icon } from "@/components/icons"

interface User {
  id: string
  name: string
  avatar: string
  verified?: boolean
}

interface CommentItem {
  id: string
  author: User
  createdAt: string
  content: string
  gif?: string
  image?: string
}

interface CommentSectionProps {
  comments: CommentItem[]
  currentUser: User
  onAddComment: (comment: { text: string; gif?: string; image?: string }) => void
}

const Avatar: React.FC<{ src: string; alt?: string; size?: number; className?: string }> = ({
  src,
  alt,
  size = 40,
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover ring-2 ring-white/10 shadow-sm"
      style={{ width: size, height: size }}
    />
  </div>
)

const EMOJI_CATEGORIES = {
  reactions: ['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😮', '😢', '😡', '👍', '👎', '❤️', '🔥', '💯'],
  gestures: ['👋', '👏', '🙌', '👊', '✊', '🤝', '🙏', '💪', '🤞', '✌️', '🤟', '👌', '👈', '👉', '👆'],
  objects: ['🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '⭐', '✨', '💎', '🔔', '📚', '💡', '🚀', '⚡', '🌟']
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, currentUser, onAddComment }) => {
  const [newComment, setNewComment] = React.useState("")
  const [showTextTools, setShowTextTools] = React.useState(false)
  const [attachedImage, setAttachedImage] = React.useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const [showGifPicker, setShowGifPicker] = React.useState(false)
  const [gifSearchQuery, setGifSearchQuery] = React.useState("")
  const [gifs, setGifs] = React.useState<any[]>([])
  const [selectedGif, setSelectedGif] = React.useState<string | null>(null)

  const timeAgo = (dateString: string) => {
    const now = new Date()
    const d = new Date(dateString)
    const mins = Math.floor((now.getTime() - d.getTime()) / (1000 * 60))
    if (mins < 60) return `${mins}m`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h`
    return `${Math.floor(hrs / 24)}d`
  }

  const handleAddComment = () => {
    if (newComment.trim() || attachedImage || selectedGif) {
      onAddComment({
        text: newComment,
        image: attachedImage || undefined,
        gif: selectedGif || undefined
      })
      setNewComment("")
      setAttachedImage(null)
      setSelectedGif(null)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAttachedImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = newComment.substring(start, end)
    
    let formattedText = selectedText
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `__${selectedText}__`
        break
    }
    
    const newText = newComment.substring(0, start) + formattedText + newComment.substring(end)
    setNewComment(newText)
  }

  const searchGifs = async (query: string) => {
    if (!query.trim()) {
      setGifs([])
      return
    }
    
    try {
      // Mock GIPHY API response - replace with actual GIPHY API call
      const mockGifs = [
        { id: '1', url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif' },
        { id: '2', url: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif' },
        { id: '3', url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif' },
        { id: '4', url: 'https://media.giphy.com/media/3o6Zt4HU9uwXmXSAuI/giphy.gif' }
      ]
      setGifs(mockGifs)
    } catch (error) {
      console.error('Error fetching GIFs:', error)
    }
  }

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      if (gifSearchQuery) {
        searchGifs(gifSearchQuery)
      }
    }, 300)
    return () => clearTimeout(debounce)
  }, [gifSearchQuery])

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3 mb-4">
          <Avatar src={comment.author.avatar} alt={comment.author.name} size={32} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gray-900">{comment.author.name}</span>
              {comment.author.verified && <Icon.Verified className="h-3 w-3 text-blue-500" />}
              <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-700">{comment.content}</p>
            {comment.image && (
              <img src={comment.image} alt="Comment attachment" className="mt-2 max-w-48 rounded-lg" />
            )}
            {comment.gif && (
              <img src={comment.gif} alt="GIF" className="mt-2 max-w-48 rounded-lg" />
            )}
          </div>
        </div>
      ))}
      
      {/* Add Comment */}
      <div className="flex gap-3 mt-4">
        <Avatar src={currentUser.avatar} alt={currentUser.name} size={32} />
        <div className="flex-1">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={2}
            />
            {attachedImage && (
              <div className="mt-2 relative inline-block">
                <img src={attachedImage} alt="Attached" className="max-w-32 h-20 object-cover rounded-lg" />
                <button
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
            {selectedGif && (
              <div className="mt-2 relative inline-block">
                <img src={selectedGif} alt="Selected GIF" className="max-w-32 h-20 object-cover rounded-lg" />
                <button
                  onClick={() => setSelectedGif(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          
          {/* Comment Tools */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTextTools(!showTextTools)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Text formatting"
              >
                <span className="text-sm font-bold">Aa</span>
              </button>
              
              <label className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="Attach photo">
                <Icon.Image className="h-4 w-4" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add emoji"
              >
                <span className="text-sm">😊</span>
              </button>
              
              <button
                onClick={() => setShowGifPicker(!showGifPicker)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add GIF"
              >
                <span className="text-xs font-bold">GIF</span>
              </button>
            </div>
            
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() && !attachedImage && !selectedGif}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Comment
            </button>
          </div>
          
          {/* Text Formatting Tools */}
          {showTextTools && (
            <div className="flex gap-2 mt-2 p-2 bg-gray-50 rounded-lg">
              <button onClick={() => formatText('bold')} className="px-3 py-1 text-sm font-bold hover:bg-gray-200 rounded">B</button>
              <button onClick={() => formatText('italic')} className="px-3 py-1 text-sm italic hover:bg-gray-200 rounded">I</button>
              <button onClick={() => formatText('underline')} className="px-3 py-1 text-sm underline hover:bg-gray-200 rounded">U</button>
            </div>
          )}
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                <div key={category} className="mb-3">
                  <div className="text-xs font-medium text-gray-500 mb-2 capitalize">{category}</div>
                  <div className="grid grid-cols-8 gap-1">
                    {emojis.map((emoji, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setNewComment(prev => prev + emoji)
                          setShowEmojiPicker(false)
                        }}
                        className="p-1 text-lg hover:bg-gray-100 rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* GIF Picker */}
          {showGifPicker && (
            <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Search GIFs..."
                value={gifSearchQuery}
                onChange={(e) => setGifSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {gifs.map((gif) => (
                  <button
                    key={gif.id}
                    onClick={() => {
                      setSelectedGif(gif.url)
                      setShowGifPicker(false)
                    }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img src={gif.url} alt="GIF" className="w-full h-20 object-cover rounded" />
                  </button>
                ))}
              </div>
              {gifSearchQuery && gifs.length === 0 && (
                <div className="text-center text-gray-500 py-4">No GIFs found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}