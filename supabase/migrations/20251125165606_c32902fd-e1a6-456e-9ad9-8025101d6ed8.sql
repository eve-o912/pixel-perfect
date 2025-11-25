-- Create films table
CREATE TABLE public.films (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  release_year INTEGER,
  image_url TEXT,
  vote_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  film_id UUID NOT NULL REFERENCES public.films(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, film_id)
);

-- Enable Row Level Security
ALTER TABLE public.films ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Films policies (everyone can view, only authenticated users data affects votes)
CREATE POLICY "Anyone can view films"
ON public.films
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert films"
ON public.films
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update films"
ON public.films
FOR UPDATE
TO authenticated
USING (true);

-- Votes policies (users can only manage their own votes)
CREATE POLICY "Users can view all votes"
ON public.votes
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert their own votes"
ON public.votes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
ON public.votes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_films_updated_at
BEFORE UPDATE ON public.films
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update vote count
CREATE OR REPLACE FUNCTION public.update_film_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.films 
    SET vote_count = vote_count + 1 
    WHERE id = NEW.film_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.films 
    SET vote_count = vote_count - 1 
    WHERE id = OLD.film_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically update vote counts
CREATE TRIGGER update_vote_count_on_insert
AFTER INSERT ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_film_vote_count();

CREATE TRIGGER update_vote_count_on_delete
AFTER DELETE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_film_vote_count();